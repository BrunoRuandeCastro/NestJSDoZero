#!/bin/bash

npm intall
npm run build
npx typeorm migration:run
npm run start:dev
