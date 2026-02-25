## Task

**Route:** `/dashboard/sessions/4822e64f-10a3-4f92-b64b-28ab3343354e`

Change name to "Sepp Meier"

### Failed Requests (1)

  <details>
  <summary><code>500 POST /api/sessions/4822e64f-10a3-4f92-b64b-28ab3343354e/pr</code></summary>

**cURL:**
```bash
curl -X POST '/api/sessions/4822e64f-10a3-4f92-b64b-28ab3343354e/pr'
```

**Response:**
```json
{"error":"Error: Failed to create PR: 422 {\"message\":\"Validation Failed\",\"errors\":[{\"resource\":\"PullRequest\",\"code\":\"custom\",\"message\":\"No commits between main and jeder/session-1772029112875\"}],\"documentation_url\":\"https://docs.github.com/rest/pulls/pulls#create-a-pull-request\",\"status\":\"422\"}"}
```

  </details>
