
# Overview
The Scoreboard API module will handle the following primary functions:

- Score Update: Handle user actions and update their scores.
- Real-time Leaderboard Updates: Provide real-time updates of the top 10 user scores.
- Security: Implement necessary mechanisms to prevent unauthorized score increases or any form of tampering.

# EndPoints

## POST /api/v1/scores/update
- Description: This endpoint will be called whenever a user completes an action that increases their score. It receives the user ID, action ID, and updates the score for that user.


- Process Flow:
Validate JWT token and ensure that the request is authorized.
Verify the action performed by the user (for anti-tampering).
Update the user's score in the database.
Trigger real-time notification to update the scoreboard if the user's score qualifies them for the top 10 list.

## GET /api/v1/scores/top10
- Description: This endpoint provides the current top 10 user scores for the leaderboard. It will be used by the frontend to display the leaderboard.

- Process Flow:
Fetch the top 10 users with the highest scores from the database.
Return the list of users and their scores, sorted in descending order by score.
Real-time Updates


# Database Schema
## User Table (users)

| Column      | Type      | Description                              |
|-------------|-----------|------------------------------------------|
| id          | UUID      | Unique identifier for the user.          |
| username    | string    | User's display name.                     |
| score       | integer   | The user's total score.                  |
| created_at  | datetime  | Timestamp when the user was created.     |
| updated_at  | datetime  | Timestamp when the user was last updated. |

## Action Table (actions)

| Column      | Type      | Description                              |
|-------------|-----------|------------------------------------------|
| id          | UUID      | Unique identifier for the action.        |
| user_id     | UUID      | Foreign key for the user who took action.|
| action_type | string    | Type of action taken.                    |
| score_delta | integer   | Points gained from this action.          |
| created_at  | datetime  | Timestamp when the action was performed. |



# Security Considerations
## JWT Authentication
- Authentication: All API requests that modify user scores should require a valid JWT token in the request header. The token should be verified for each request to ensure the action is coming from an authenticated user.
## Input Validation
- Action Validation: The system should verify the action before applying any score changes. For example, action IDs must be validated against a known list of legitimate actions to prevent spoofing or tampering with requests.
## Rate Limiting
- Rate Limiting: To prevent malicious users from spamming the score update API, a rate limiter should be applied to the endpoint.
## Logging & Monitoring
- Audit Logs: All score updates and actions should be logged for future audits.
- Monitoring: Implement monitoring tools to detect unusual patterns of score updates (e.g., a single user repeatedly gaining high scores in a short amount of time).
     
# Potential Improvements

- Caching: Implement caching for the top 10 scores to minimize database queries when the leaderboard is frequently accessed.
- Leaderboard Filters: Allow for multiple types of leaderboards (e.g., daily, weekly, all-time leaderboards), which can be fetched by specifying filters in the /api/v1/scores/top10 endpoint.
- Pagination Support: For future scalability, introduce pagination for the leaderboard, allowing users to view more than the top 10 scores, if needed.
