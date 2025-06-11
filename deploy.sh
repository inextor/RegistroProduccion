#!/bin/bashr

# Prompt the user for confirmation
read -p "Are you sure you want deploy TO Produccion? (YES/NO) " answer

# Check the user's response
if [[ $answer != "YES" ]]; then
	echo "Nice Call ..."
	return;
fi

echo "Deploying $1 to production2";


if [[ ! -e ~/Projects/RegistroProduccion/dist/myapp/browser/ ]]; then
	popd;
	echo "Dist directory not found";
	return;
fi

rsync ~/Projects/RegistroProduccion/dist/myapp/browser/* pos:/var/www/html/integranet.xyz/subdomains/mol/

popd
