ver 1.0 Development build

## Overview 

This is a simple React App for managing your daily shopping list. Unfortunately, so far the App in only available in Polish. As of ver 1.0 the app is not compatible with mobile phones and works best a the 1920x1080 resolution. It is composed of three main interfaces:

### Running the App

The app makes use of the Create React App enviornment and in its current configuration can be accessed on localhost:8080:

```
npm i
npm start
```
However, as it is currently connected to a local db.json file via the json-server library, it is aslo mandatory to install json-server globally
```
npm install -g json-server
```
and start it from another terminal with the following command (it is configured to run on localhost:3000):
```
json-server --watch db.json
```

### Fridge

Here you can add, edit and remove ingriedients from a virtual fridge/pantry which should represent your actual household supplies. It is important to save the data to the database by clicking the button if you wish for it to be avaialable in a future session.

### Recipes

Here you can add, edit and remove your recipes. Once added a recipe is automatically saved to the database via a post request.

### Menu

The part of the App which utilizes data from the other two components. Here you can create a dynamic menu for a given date-span. A full shopping list of the required items, as well as a supplementary list of the missing items (when taking into account the state of our fridge) is rendered dynamically and is also avaialble for download at any moment as a docx file.

## Database

In its current build the app makes use of the json-server and Axios packages and makes get and post requests to a local db.json file via localhost. It can be easily setup for another server.

## TODO for future releases

Implement additional units and unit conversion.
Add an Enlish language pack.
Implement filter searches for recipes and ssupplies.
Implement an autocomplete feature for the inputs

