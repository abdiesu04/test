

### Steps to start the applicaiton

##. Install dependencies:
```bash
npm install
```

## create  `.env` file with your MongoDB connection string and other configurations.

## Running the Application

```bash
npm run dev
```

The server will start on port 3000 by default.

## API Endpoints

### Claim Bonus
```http
POST /api/claim-bonus
```

Request body:
```json
{
  "userId": "userid1",
  "bonusType": "DAILY"
}
```

Allowed bonus types:
- DAILY
- WELCOME
- EVENT

### Response Examples

Success (201):
```json
{
  "message": "Bonus claimed successfully",
  "claim": {
    "id": "...",
    "userId": "user123",
    "bonusType": "DAILY",
    "claimedAt": "..."
  }
}
```

Error (400 - Invalid Input):
```json
{
  "status": "fail",
  "error": "Invalid bonus type",
  "errorCode": "INVALID_BONUS_TYPE"
}
```

Error (409 - Already Claimed):
```json
{
  "status": "fail",
  "error": "User has already claimed DAILY bonus",
  "errorCode": "BONUS_ALREADY_CLAIMED"
}
```
