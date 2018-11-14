<!-- TITLE/ -->

<h1>native-promise-pool</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/bevry/native-promise-pool" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/bevry/native-promise-pool/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/native-promise-pool" title="View this project on NPM"><img src="https://img.shields.io/npm/v/native-promise-pool.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/native-promise-pool" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/native-promise-pool.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/bevry/native-promise-pool" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/bevry/native-promise-pool.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/bevry/native-promise-pool#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/bevry/native-promise-pool.svg" alt="Dev Dependency Status" /></a></span>
<br class="badge-separator" />
<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-thanksapp"><a href="https://givethanks.app/donate/npm/native-promise-pool" title="Donate to this project using Thanks App"><img src="https://img.shields.io/badge/thanksapp-donate-yellow.svg" alt="Thanks App donate button" /></a></span>
<span class="badge-boostlab"><a href="https://boost-lab.app/bevry/native-promise-pool" title="Donate to this project using Boost Lab"><img src="https://img.shields.io/badge/boostlab-donate-yellow.svg" alt="Boost Lab donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Create a pool of a specified concurrency that accepts functions that return promises

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save native-promise-pool</code></li>
<li>Module: <code>require('native-promise-pool')</code></li></ul>

<a href="http://browserify.org" title="Browserify lets you require('modules') in the browser by bundling up all of your dependencies"><h3>Browserify</h3></a><ul>
<li>Install: <code>npm install --save native-promise-pool</code></li>
<li>Module: <code>require('native-promise-pool')</code></li>
<li>CDN URL: <code>//wzrd.in/bundle/native-promise-pool@1.0.0</code></li></ul>

<a href="http://enderjs.com" title="Ender is a full featured package manager for your browser"><h3>Ender</h3></a><ul>
<li>Install: <code>ender add native-promise-pool</code></li>
<li>Module: <code>require('native-promise-pool')</code></li></ul>

<h3><a href="https://github.com/bevry/editions" title="Editions are the best way to produce and consume packages you care about.">Editions</a></h3>

<p>This package is published with the following editions:</p>

<ul><li><code>native-promise-pool</code> aliases <code>native-promise-pool/index.js</code> which uses <a href="https://github.com/bevry/editions" title="Editions are the best way to produce and consume packages you care about.">Editions</a> to automatically select the correct edition for the consumers environment</li>
<li><code>native-promise-pool/source/index.js</code> is esnext source code with require for modules</li>
<li><code>native-promise-pool/edition-browsers/index.js</code> is esnext compiled for browsers with require for modules</li></ul>

<!-- /INSTALL -->


## Usage

[API Documentation.](http://master.native-promise-pool.bevry.surge.sh/docs/)

### Table Example

[![Table Example Preview.](https://asciinema.org/a/4KUisfehzywXoVlFEcM2zuMdG.svg)](https://asciinema.org/a/4KUisfehzywXoVlFEcM2zuMdG)

[Table Example Source.](https://github.com/bevry/native-promise-pool/blob/master/examples/table.js)

### Simple Example

[![Table Example Preview.](https://asciinema.org/a/1lbq2PEEezF6zsGuUH09Rgh5w.svg)](https://asciinema.org/a/1lbq2PEEezF6zsGuUH09Rgh5w)

[Table Example Source.](https://github.com/bevry/native-promise-pool/blob/master/examples/simple.js)

### Finally

This package depends on `Promise.prototype.finally` existing, which it does on Node v10 and above.

On older environments, you can provide compatibility via two methods.

By passing `PromiseClass`:

``` javascript
const pool = require('native-promise-pool').create({
    concurrency: 2,
    PromiseClass: require('bluebird')
})
```

Or by adding direct support to the builtin `Promise` class:

``` javascript
require('promise.prototype.finally').shim()
const pool = require('native-promise-pool').create({concurrency: 2})
```


<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/bevry/native-promise-pool/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

<h2>Contribute</h2>

<a href="https://github.com/bevry/native-promise-pool/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li>Benjamin Lupton</li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-thanksapp"><a href="https://givethanks.app/donate/npm/native-promise-pool" title="Donate to this project using Thanks App"><img src="https://img.shields.io/badge/thanksapp-donate-yellow.svg" alt="Thanks App donate button" /></a></span>
<span class="badge-boostlab"><a href="https://boost-lab.app/bevry/native-promise-pool" title="Donate to this project using Boost Lab"><img src="https://img.shields.io/badge/boostlab-donate-yellow.svg" alt="Boost Lab donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/bevry/native-promise-pool/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository bevry/native-promise-pool">view contributions</a></li></ul>

<a href="https://github.com/bevry/native-promise-pool/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2018+ Benjamin Lupton</li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
