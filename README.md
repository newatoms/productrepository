A system for maintaining and building standard repositories for New Atoms products

## File naming

Having consistent naming makes folders clear and understandable for humans and robots alike.

projects go in to the folder: `projects/`_project-slug_`/` and should have the following files:

* a `title.txt` for the post's title
* a `post.md` for the post
* a `premise.txt` for the premise of an article. It has a *character limit of 140*.
* a `tweets.txt` for the tweets (one per line)
* a `linkedin.txt` for the LinkedIn post if there is one and a folder with files if there are multiple
* a `facebook.txt` for the Facebook post if there is one and a folder with files if there are multiple
* a `pitch.md` for the pitch

A good project slug is a codename for the project of 2 or 3 words, in lowercase with dashes and can be anything as long as it is rememberable.

## Installing on CI

You need a config file to deploy this repo, it needs to be formed as `config.example.js`. If on a headless CI machine you probably don't want to send a `json` file there, so you can encode it as BASE64 and store it as an environment variable called BASE64_CONFIG.
