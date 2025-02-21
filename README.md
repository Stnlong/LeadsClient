Prereqs:
npm install

port should be already be set to 4200.
api is set to allow access from 4200.

How to run project:
ng serve

How to test:
- main page loads mock data(5 rows).
- clicking the Receive Data from Provider button will simulate data being pushed. More rows will be added to the table.
- each row can be clicked to open a dialog.


Notes on the code:
DashboardComponent is the root entry component
- attempts to fetch data on init
- added a button to simulate receiving 3rd party data. Push mock data then fetch all data again, refreshing the data table.

LeadsDetailsComponent
- there are disabled text and email buttons for future implementation.

LeadsService
- addLeads - pushes mock data to the api
- getData - fetch data