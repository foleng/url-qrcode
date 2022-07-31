interface IContentScript {
  entry: string;
}

interface IOpts {
  contentScript?: IContentScript;
}
import { basename, extname, dirname } from 'path'
import { writeFile, readFile } from 'node:fs/promises'
import htmlToJson from 'html-to-json'
import _ from 'lodash'

const filter = (raw: any, filterKey: string, suffix: string) => {
  return raw.filter(item => extname(item[filterKey]) === suffix).map(item => item[filterKey])
}

const writeContentFile = (url, dir) => {
  const template = `(async () => {
  const src = chrome.extension.getURL('${url}');
  await import(src);
  })();`
  console.log(">>>>>>>>>>>>", dir + url);

  writeFile(dir + "content.js", template)
}



const transContentScript = (opts: IOpts = {}, options, bundle) => {
  const { dir } = options;
  const { entry } = opts?.contentScript || {};
  const fileName = basename(entry)
  const contentHtml = bundle[fileName];
  var promise = htmlToJson.parse(contentHtml.source, {
    'scripts': ['script', function ($doc) {
      return $doc.attr();
    }],
    "links": ['link', function ($doc) {
      return $doc.attr();
    }],
  });

  promise.done(async (result) => {
    console.log(result);
    const { scripts, links } = result;
    const dirPath = dirname(entry);
    const defaultManifest = await readFile(dirPath + '/manifest.json');
    const customManifest = {
      web_accessible_resources: [
        ...filter(links, 'href', '.js'),
        ...filter(scripts, 'src', '.js')
      ],
      content_scripts: [{
        js: [
          "content.js"
        ],
        css: filter(links, 'href', '.css')
      }],
    }
    writeContentFile(filter(scripts, 'src', '.js')[0], dir)
    const target = _.merge(JSON.parse(defaultManifest.toString()), customManifest);
    console.log(JSON.stringify(target));
    setTimeout(() => {
      writeFile("E:/me/url-qrcode/dest/" + "manifest.json", JSON.stringify(target))
    }, 5000);
  })
}


function rollupPluginTransferManifest(opts: IOpts) {
  return {
    name: "rollup-plugin-transfer-manifest", // rollup插件名称，必须符合格式
    generateBundle(options, bundle) {
    },
    writeBundle(options, bundle) {
      console.log(options, bundle);
      transContentScript(opts, options, bundle)

    }
  }
}


export default rollupPluginTransferManifest