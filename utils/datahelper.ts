import fs from 'fs';
import path from 'path';

export type TestDataMap = Record<string, Record<string, unknown>>;

export type TestContract = {
  required: string[];
  optional?: string[];
  unknownKeys?: 'allow' | 'warn' | 'error';
};

export type ContractsMap = Record<string, TestContract>;

export function loadContracts(filename = 'data/contracts.json'): ContractsMap {
  const jsonPath = path.resolve(process.cwd(), filename);
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

export function loadTestData(filename = 'data/test-data.json'): TestDataMap {
  const jsonPath = path.resolve(process.cwd(), filename);
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

export function getDataForTest(testName: string, data: TestDataMap) {
  const entry = data[testName];
  if (!entry) throw new Error(`No test data key found for "${testName}"`);
  return entry as Record<string, unknown>;
}

export function getDataForTestWithRequiredKeys(
  testName: string,
  data: TestDataMap,
  requiredKeys: string[]
) {
  const entry = getDataForTest(testName, data);

  for (const key of requiredKeys) {
    if (!(key in entry)) {
      throw new Error(`Missing key "${key}" in test data for "${testName}"`);
    }

    const value = entry[key];
    if (value === undefined || value === null || String(value).trim() === '') {
      throw new Error(
        `Invalid value for key "${key}" in test data for "${testName}". Expected a non-empty value.`
      );
    }
  }

  return entry;
}

export function getValidatedDataForTest(
  testName: string,
  data: TestDataMap,
  contracts: ContractsMap = loadContracts()
) {
  const contract = contracts[testName];
  if (!contract) {
    throw new Error(`No contract found for test "${testName}" in data/contracts.json`);
  }

  const requiredKeys = Array.isArray(contract.required) ? contract.required : [];
  const optionalKeys = Array.isArray(contract.optional) ? contract.optional : [];
  const unknownKeysPolicy = contract.unknownKeys || 'error';

  if (requiredKeys.length === 0) {
    throw new Error(`Contract for "${testName}" must define at least one required key`);
  }

  const duplicateKeys = requiredKeys.filter((key) => optionalKeys.includes(key));
  if (duplicateKeys.length > 0) {
    throw new Error(
      `Contract for "${testName}" has keys marked as both required and optional: ${duplicateKeys.join(', ')}`
    );
  }

  const entry = getDataForTestWithRequiredKeys(testName, data, requiredKeys);

  const allowedKeys = new Set([...requiredKeys, ...optionalKeys]);
  const unknownKeys = Object.keys(entry).filter((key) => !allowedKeys.has(key));
  if (unknownKeys.length > 0) {
    const message = `Unknown key(s) in test data for "${testName}": ${unknownKeys.join(', ')}`;
    if (unknownKeysPolicy === 'error') {
      throw new Error(message);
    }
    if (unknownKeysPolicy === 'warn') {
      console.warn(message);
    }
  }

  for (const key of optionalKeys) {
    if (key in entry) {
      const value = entry[key];
      if (value === null || value === undefined) {
        throw new Error(
          `Invalid optional key "${key}" in test data for "${testName}". Expected a value when present.`
        );
      }
    }
  }

  return entry;
}
