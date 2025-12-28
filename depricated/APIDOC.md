# Fun Stuff API Documentation
The Fun Stuff API provides information and storage for the random number guesser and the dictionary sections of the fun stuff view.

## check if random number guess is correct
**Request Format:** /number?guess

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** returns wether the user's guess for the random number was correct or not.

**Example Request:** /number?guess=7

**Example Response:**
```
Wrong, try again!
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in a non-integer value: `Non integer value passed in`

## check if word is in dictionary, return defenition if it is
**Request Format:** /definition?word

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** checks if a word is in dictionary and returns definition if it is and notice if it is not

**Example Request:** /definition?word=table

**Example Response:**
```json
{
"0": "Word not in dictionary"
}
```

**Error Handling:**
- N/A

## add word to dictionary
**Request Format:** /new-definition?definition

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** adds a word with its definition to the dictionary

**Example Request:** /new-definition?definition

**Example Response:**
```
success
```

**Error Handling:**
- N/A