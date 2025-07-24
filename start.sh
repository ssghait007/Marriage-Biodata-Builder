#!/bin/bash

# Ensure errors cause script to exit
set -e

# Start Backend
cd Backend


echo "Starting Backend..."
npm run dev &
BACK_PID=$!
cd ..

# Start Frontend
cd frontend


echo "Starting Frontend..."
npm run dev &
FRONT_PID=$!
cd ..

# Trap CTRL+C and kill both processes
trap 'echo -e "\nStopping..."; kill $BACK_PID $FRONT_PID; exit 0' SIGINT

# Wait for both to exit
wait $BACK_PID
wait $FRONT_PID
