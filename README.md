# personal-blog-website

This is the repository for my own little website/blog project. You can find the live site here: [www.dunkelarts.ch](https://www.dunkelats.ch)

Feel free to reuse any code and assets for your own personal site.

## Project Structure

```
├───conf/                   # configuration for nginx container
├───public/                 # Website
│   ├───assets/             # static assets
│   │   ├───css/            # CSS files
│   │   ├───fonts/          # custom fonts
│   │   ├───icons/          # website favicon
│   │   ├───images/         # images
│   │   └───js/             # javascript files
│   ├───components/         # website components
│   ├───pages/              # website content
│   └───posts/              # blog posts in markdown
|   |   └───manifest.json   # configuration for blogposts
│   └───index.html          # main page
└───docker-compose.yaml     # docker compose config file    
```

## Local Dev environement

Start Webserver
```cmd
docker-compose up
```

- [localhost:8080](http://localhost:8080)

## ToDo

- [x] Mobile Disclaimer
- [x] Blog Function
- [ ] Custom Curser
- [x] Favicon
- [ ] header banner
- [x] button
- [ ] Content

## License
This repository uses a MIT license.
See the LICENSE file for full details.
