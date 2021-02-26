# Foreword

First, thanks for making the time for this challenge! We really appreciate it.

## Challenge - Dog Team

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Assumptions / Considerations

- Logic of the breeds team should be abstracted to its own hook probably since now all the logic is living inside the `BreedCard` (only needed there)
- Assumed that in the Home page all breeds should be displayed
- The search breed input starts searching after not typing for 350ms
- Used `Local Storage` for implementing breeds team

### What should you build?

Design a small React app that shows a list of breeds using the api "Dog API" (https://dog.ceo/dog-api/). Add the ability to search the list by breed name. When a breed on the list is clicked, the app should navigate to the breed page.

The breed page: this page should show a list of dog pictures of the breed. This list should have a traditional pager or a scrolling pager, you decide. Add a button "Add to my team" to each dog.

When "add to my team" button is clicked, the dog should be added to the user's team. The user's team can have a maximum of 10 dogs and cannot have more than 3 dogs of the same breed.

My team section: this section should display the user's team. The dogs should be grouped by breed in the UI. Add a button to remove a dog from the user's team.

For saving the data of "My team section" use something local, may be cookies, local storage or something else. But don't use anything on the server side.

### Notes

- Add a README with everything you consider necessary to run the app
- Do not develop any backend code
- If you make any assumptions, take note of them in the README, so we can better understand your decisions.
- We are open for questions if you have any doubts
