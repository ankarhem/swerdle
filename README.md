# Swerdle - Wordle på Svenska

Klon av [wordle](https://www.powerlanguage.co.uk/wordle/) med en ord från en filtrerad svensk ordlista.

Går att spela [här](https://swerdle.ankarhem.dev).

## Kör med docker

### Compose

```
version: '3.7'
services:
  swerdle:
    container_name: swerdle
    image: ghcr.io/ankarhem/swerdle:latest
    volumes:
      - "/path/to/persist/db:/usr/src/app/db"
```

### Docker run

```
docker run -d --name swerdle -v "/path/to/persist/db:/usr/src/app/db" ghcr.io/ankarhem/swerdle:latest
```

## Delta i utvecklingsarbetet

Läs [\"Contributing guidelines\"](.CONTRIBUTING.md)
