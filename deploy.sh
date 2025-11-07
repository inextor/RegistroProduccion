#!/bin/bash

# Check if directory argument is provided
if [[ -z "$1" ]]; then
	echo "Error: Directory argument required. Usage: ./deploy.sh [mol|mol2]"
	exit 1
fi

# Validate directory argument - only accept mol or mol2
if [[ "$1" != "mol" && "$1" != "mol2" ]]; then
	echo "Error: Invalid directory '$1'. Only 'mol' or 'mol2' are accepted."
	exit 1
fi

# Prompt the user for confirmation
read -p "Are you sure you want to deploy to $1.integranet.xyz? (YES/NO) " answer

# Check the user's response
if [[ $answer != "YES" ]]; then
	echo "Nice Call ..."
	exit;
fi

echo "Deploying to $1.integranet.xyz";

# Check if dist directory exists
if [[ ! -e ~/Projects/RegistroProduccion/dist/myapp/browser/ ]]; then
	echo "Dist directory not found";
	exit 1;
fi

# Deploy to the specified subdomain
rsync -av ~/Projects/RegistroProduccion/dist/myapp/browser/* pos:/var/www/html/integranet.xyz/subdomains/$1/
