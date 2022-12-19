# Destiny 2 Lost Sector Tracker

Get info about the daily Legend and Master Lost Sector and potential exotic drops.

## Purpose

The main purpose is obviously to provide information to Destiny 2 players about the current and upcoming Legend and Master Lost Sector, and what exotics they drop.

Users can also track what loot drops from each run.

The end goal is to notify users whether an upcoming Lost Sector is considered a fast farm and drops an exotic they need.

Additionally, combining users' own reports on drops per run with activity completion data from Bungie's APIs lets us gather empirical data on drop rates, and which Lost Sectors are the fastest to run.

## Technology

- [Deno](https://deno.land) is used for the back-end
- [Sanity](https://sanity.io) is used as a CMS to easily be able to edit the Lost Sector rotation if needed. Bungie might change the rotation season over season, so having the ability to quickly make edits to the rotation is important.
- Client libraries have not yet been decided, but [React](https://reactjs.org) is an obvious contender.

## Contributing

This project is open source, so you're very much encourage to contribute!

### Get started

Clone this repository, create a branch, push your changes and create a pull request. That's essntialy it.

Make sure, if you're looking to contribute on the back-end, to have Deno installed on your system. See [Deno's installation guide](https://deno.land/manual@v1.29.1/getting_started/installation) for correct installation on your system.
