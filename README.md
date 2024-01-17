[ ] Add method for multiple payments. In and array.
[ ] Remove methods (by class, student, payID, id)
[ ] Get metrics for updated models. Merging collections and complexity and hit
[ ] Gather server side statistical data

## GET METHODS

[+] Get total number of paid students [+] Colocation would be benificial
[  ] Get total number of students paid per class
[  ] Get number of paid students per class section
[  ] Get number ratios
[  ] Get combined number
[+] Get $ value if all paid
[  ] Get $ value if all paid in a class section
[  ] Get $ value if all paid in all sections of a class
[  ] Get list of total unpaid students
[  ] Get list of unpaid students in class
[  ] Get list of unpaid students in class section

## Changes to the model

- Do metric calculation on the difference is speed in locating
- Determine if transactions are neccesary
- Determine need for atomicity
- Recheck indices

## Finalise deployment flow

- setting up a CICD
- Cleaning up code
- Refactor
- Make code leaner
- Write tests

## Setup a messaging mechanism

- Non admin can report a issue
- Admin should have a notification system
- Non admin should specify with ID of relevant issue
- Issue should have properties of seen , resolved and ID
- Admin need not have to supply username
- Basic Crud functionality

## Determine soft delete and archiving policy

- deactivation with comments
- restricted activation

[+] Strategy 1

# Add class object to the payments model

````ts
interface EmbeddedClass {
  classId: Types.ObjectId;
  className: string;
  section: string; // Assuming section is a property of a class
  fee: number; // Base fee of the class
}```
````


[+] Strategy 2 

# A payment history object to the student

```ts
interface PaymentHistoryEntry {
  paymentId: Types.ObjectId;
  payID: string;
  paid: boolean; // Indicates if the payment was made
}```

