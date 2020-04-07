ver 1.0 Development build

## Overview 

This is a simple React App for managing your daily shopping list. Unfortunately, so far the App in only available in Polish. It is composed of three main interfaces:

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

