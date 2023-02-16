const express = require('express');
const router = express.Router();
const Link = require('./Link');
const slugify = require('slugify');
const puppeteer = require('puppeteer');


router.get('/admin/links', (req, res) => {
  const create = req.flash('create');
  const importar = req.flash('importar');
  const edit = req.flash('edit');
  const del = req.flash('del');

  Link.findAll().then(links => {
    res.render('admin/links/index', { links: links, create, importar, edit, del});
  })
});

router.get('/admin/links/new', (req,res) => {
  const create = req.flash('create');

    res.render('admin/links/new', { create });
});

router.get('/admin/links/edit/:id', (req, res) => {
  const edit = req.flash('edit');

  let id = req.params.id;
  Link.findByPk(id).then(link => {
    if(link != undefined) {
      res.render('admin/links/edit', {link: link, edit})
    }else {
      res.redirect('/admin/article/')
    }
  }).catch(err => {
    res.redirect('/admin/links')
  });
})

router.get('/admin/links/new-web-link', (req, res) => {
  const importar = req.flash('importar');

  res.render('admin/links/new-web', { importar })
});

router.post('/links/save', (req, res) => {
  let title = req.body.title;
  let link = req.body.link;

  Link.create({
    label: title,
    slug: slugify(title),
    url: link
  }).then(() => {
    req.flash('create', req.body.title)
    res.redirect('/admin/links');
  });
})

router.post('/links/delete', (req, res) => {
  let id = req.body.id;
  if(id != undefined) {
    if(!isNaN(id)) {
      Link.destroy({
        where: {
          id: id
        }
      }).then(() => {
        req.flash('del', 'deleted')
        res.redirect('/admin/links');
      })
    }else {
      res.redirect('admin/links');
    }
  }else {
    res.redirect('admin/links');
  }
})

router.post('/links/update', (req, res) => {
  let id = req.body.id;
  let label = req.body.label;
  let url = req.body.url;

  Link.update(
    {
    label: label,
    slug: slugify(label),
    url: url
  },
  {
    where: {
      id: id
    }
  }
  ).then(() => {
    const edit = req.flash('edit', label = req.body.label);
    res.redirect('/admin/links')
  })
})


router.post('/links/web-save', async (req, res) => {

  let link = req.body.link;

  
const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

  const browser = await puppeteer.launch({
    args: minimal_args
  });
  const page = await browser.newPage();
  await page.goto(link);


  const pageContent = await page.evaluate(() => {
    return {
      title: document.getElementsByClassName('css-1k5pqev')[0].textContent
    };
  });

  await browser.close();

  Link.create({
    label: pageContent.title,
    slug: slugify(pageContent.title),
    url: link
  }).then(() => {
    req.flash('importar', req.body.link)
    res.redirect('/admin/links');
  });

})

module.exports = router;
