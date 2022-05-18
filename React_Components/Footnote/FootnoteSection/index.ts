import OriginFootnoteSection from './FootnoteSection';
import OriginFootnote from './Footnote';

export type FootnoteSectionProps = typeof OriginFootnoteSection & {
  Footnote: typeof OriginFootnote;
};

const FootnoteSection = OriginFootnoteSection as FootnoteSectionProps;

FootnoteSection.Footnote = OriginFootnote;

export default FootnoteSection;
