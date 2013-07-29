# node markdown site

Damn this name sucks, but that's what it is...

This is the simplest static site generator out there.  I'm using it for [my own site](http://geekderek.com/).

## The Idea

You have this `pages` folder where you put all your site's content, in [markdown](http://daringfireball.net/projects/markdown/) format.  Let's say your `pages` folder look like this:

	pages/
		index.md
		about.md
		contact.md
		blog/
			my first blog.md
			my second blog.md

Now, when someone visits your index (`www.yoursite.com`), `index.md` will be rendered.  When visiting `www.yoursite.com/about`, `about.md` will be rendered.  When visiting `www.yoursite.com/blog/my-first-blog`, `my first blog.md` will be rendered.  As simple as that.  Once you have set up the basic look and feel of your site, all you need to do to maintain and update your site is to edit the markdown documents in your pages directory.

## Usage

When confused, take a look at `examples/site`.

1. `git clone` this repo.
2. Create a file called `config.js` in the base directory, in the following format:

	```js
	module.exports = {
	  siteDir: 'path/to/your/site'
	}
	```

	Change `siteDir` to where you want to put your site.

3. In your site folder, create three folders: `pages`, `public`, `views`.  Optionally create a `config.js`.
4. Put a [Jade](https://github.com/visionmedia/jade) view into `views`, named `index.jade`.  Inside the view, leave an interpolation variable named `content`.  That's where your rendered markdown file will be displayed.
5. Put some [markdown](http://daringfireball.net/projects/markdown/) documents into `pages`.

That's it.  Now go back to this repo and run `node app.js`.  Your site is up!

## Configuration

There are two `config.js` involved, one in this repo and another in your site folder.

The `config.js` in the repo currently only supports two option: `siteDir`, which is the path to your site folder; and `port`, which is the port that you want your site to run on.  The port defaults to 3000, although you might want to serve in port 80 when you are ready to deploy your site.

The `config.js` in your site repo supports the following options:

1. `indexPage`.  Defaults to `index`.  This option specifies which document to render when someone visits your index page (`www.yoursite.com`).
2. `baseView`.  Defaults to `index`.  This option specifies which view file under `views` to render.
3. `viewEngine`.  Defaults to `jade`.  You may also use any other view engines that [express](http://expressjs.com/) supports.
4. `siteParams`.  Defaults to nothing.  This specifies the interpolation parameters that will be passed to your view.

Again, check out `examples/site` when confused.  It's really simple.

## License

[WTFPL](http://www.wtfpl.net/).