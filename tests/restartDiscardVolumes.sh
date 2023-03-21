echo '[restarting] discarding volumes'
echo '[restarting] docker compose down -v'
docker compose down -v
echo '[restarting] removing docker image'
docker image rm bib-web:latest
echo '[restarting] docker compose up -d'
docker compose up -d
echo '[restarting] restart completed, starting logs'
echo '[restarting] docker compose logs -f'
docker compose logs -f