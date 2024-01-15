export enum Key {
  CLASS = "CLASS",
  STUDENT = "STUDENT",
  ALL_STUDENTS = "all_students",
}

export enum DynamicKey {
    CLASS= "CLASS",
    STUDENT= "STUDENT",
    CLASS_STUDENT= "CLASS_STUDENT",
}

export type DynamicKeyType = `${DynamicKey}_${string}`;