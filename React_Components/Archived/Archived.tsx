import React from 'react';
import '../../style.css';

export interface ArchivedProps extends React.HTMLAttributes<HTMLElement> {
  /** contents of Archived */
  children: React.ReactNode;
  /** optional additional content */
  content: string;
  /** language selection */
  english: boolean;
}

const Archived = ({
  children,
  content = '',
  english = true,
}: ArchivedProps) => {
  const contentText = content === '' ? '' : <p>{content}</p>;
  return english ? (
    <span>
      <section
        id="Archived"
        className="alert alert-warning wb-inview"
        data-inview="archived-bnr"
      >
        <h2>This page has been archived on the Web</h2>
        {contentText}
        <p>
          Information identified as archived is provided for reference, research
          or recordkeeping purposes. It is not subject to the Government of
          Canada Web Standards and has not been altered or updated since it was
          archived. Please contact us to request a format other than those
          available.
        </p>
      </section>

      <section
        id="archived-bnr"
        className="wb-overlay modal-content overlay-def wb-bar-t"
      >
        <header>
          <h2 className="wb-inv">Archived</h2>
        </header>
        <p>
          <a href="#archived">This page has been archived on the Web.</a>
        </p>
        {children}
      </section>
    </span>
  ) : (
    <span>
      <section
        id="archived"
        className="alert alert-warning wb-inview"
        data-inview="archived-bnr"
      >
        <h2>Cette page Web a été archivée dans le Web</h2>
        {contentText}
        <p>
          L’information dont il est indiqué qu’elle est archivée est fournie à
          des fins de référence, de recherche ou de tenue de documents. Elle
          n’est pas assujettie aux normes Web du gouvernement du Canada et elle
          n’a pas été modifiée ou mise à jour depuis son archivage. Pour obtenir
          cette information dans un autre format, veuillez communiquer avec
          nous.
        </p>
      </section>

      <section
        id="archived-bnr"
        className="wb-overlay modal-content overlay-def wb-bar-t"
      >
        <header>
          <h2 className="wb-inv">Archivée</h2>
        </header>
        <p>
          <a href="#archived">Cette page Web a été archivée dans le Web.</a>
        </p>
        {children}
      </section>
    </span>
  );
};

export default Archived;
