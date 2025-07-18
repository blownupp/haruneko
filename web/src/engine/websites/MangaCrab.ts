import { Tags } from '../Tags';
import icon from './MangaCrab.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

const chapterScript = `
    new Promise ( resolve => {
        resolve( [...document.querySelectorAll('li.wp-manga-chapter a')].map(chapter => {
            return {
                id: chapter.pathname,
                title : chapter.textContent.trim()
            }
        }));
    });
`;

@Common.MangaCSS(/^{origin}\/series\/[^/]+\/$/, 'h1.post-title')
@Common.MangasMultiPageCSS('/page/{page}/?s&post_type=wp-manga', 'div.post-title h2 > a')
@Common.ChaptersSinglePageJS(chapterScript, 1500)
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangacrab', 'Manga Crab', 'https://mangacrab.topmanhuas.org', Tags.Media.Manga, Tags.Media.Manhwa, Tags.Language.Spanish, Tags.Source.Aggregator);
    }

    public override get Icon() {
        return icon;
    }
}