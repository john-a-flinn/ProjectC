Instructions
To search, first select your filters. If filters are not visible, they will not be considered in the search.
Add and edit input data in the label cell. If a cell only accepts integers, it will only add numbers. Every cell must be filled with data or N/A.
Delete removes the associated row.

Overview
Components Folder (for future development):

components\ProductTable.tsx
    Type Enforcement
    State Variables
    API Requests
    Return:
        Search
        Add Job
        Job Table
        Edit Job

route.ts:
    GET
    POST
    PUT
    DELETE

src\app\page.tsx:
    Main

Language
Next.js: The only full-stack framework I know.
Postgres: The only database I know.

Process for Verifying
Attempted to break functionality in the front end.
If it broke, used print statements and checked the Node.js terminal for errors.

Additional Features
Made the filter dynamic, allowing searches to filter the results.
Improved the visual appearance.
Assigned new jobs the IDs of deleted jobs to maintain consistency.
Renamed all job-related variables for better readability.
Changed the tab name