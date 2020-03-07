# RMTA Bus Scheduler :station: :trolleybus: :train: :tram:

A MVP for a bus scheduler app for THE Remix Transit Authority

## Getting Started

To run this project you will need Node >= 8.10 / yarn

```bash
brew install node
brew install yarn
```

From root of the project you can then run:

```bash
yarn install
yarn start
```

### `yarn start` :rocket:

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. (should open automatically)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` :sunglasses:

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Technology and considerations:

- To get this project moving I used create-react-app
- For FE state management I used Redux. For this application it is a bit unnecessary; however,
  it really sets this project up to be extended very easily! Another benifit is it allows for a
  bit cleaner approach to handling CRUD and safety precautions with our data.
- [Immer](https://www.npmjs.com/package/immer "Immer") for data immutability, helping keep a single source of truth in our redux store.
- [uuid](https://www.npmjs.com/package/uuid "uuid") for creating unique bus ids
- [react-toast-notifications](https://github.com/jossmac/react-toast-notifications "React Toast") simple react hook to let the user know
  about any trip collisions when trying to schedule a trip for a certain bus

## Assumptions:

I felt like I stuck within the guides of the specific project description; however, I made some assumptions
along the way.

I assumed that trips could not be changed in time because these trip times were based on some historical
average and I wanted to abstract away the need to worry about rush-hour from the user. Also made my job way
easier!

## Taking this project to the next level

There many things that could be improved even with the features that are currently built. As far as new features --  
Easy wins to take this project to the next level would be taking historical trip data and getting
likely trip durations given travel times and allowing the bus scheduler to play around with what you would
need to support more trips (adding trips). Supporting the ability to play around with bus running times.
Supporting a optimize button that gives a naive optimal bus schedule based on trips / buses. Ability to add
routes. Enriching our data model and offer route analytics.

Then we will be on our way to building Remix!
