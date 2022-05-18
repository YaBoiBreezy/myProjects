import React from 'react';
import '../../style.css';

type videoType = 'mp4' | 'webm' | 'youtube';
type audioType = 'mp3' | 'ogg';
type captionType = 'text/html' | 'application/ttml+xml';

type sourceType = {
  type: videoType | audioType;
  source: string;
};
type cuePointType = {
  name: string;
  time: string;
};

export interface MultimediaPlayerProps
  extends React.HTMLAttributes<HTMLElement> {
  /** optional url to share multimedia */
  shareUrl?: string;
  /** title of video/audio. Can contain link or summary of transcript, if available */
  figcaption?: string;
  /** URL for video poster */
  poster?: string;
  /** title of video */
  title?: string;
  /** array of source links, each containing source (url) and type (MIME) ('mp4', 'webm', 'youtube', 'mp3', 'ogg') */
  sources?: sourceType[];
  /** captions language shortform (en, fr, sp...) */
  trackSrclang?: string;
  /** captions language longform for displaying to user */
  trackLabel?: string;
  /** track source URL */
  trackSrc?: captionType;
  /** track data type, MIME ('text/html' or 'application/ttml+xml') */
  trackDataType?: string;
  /** array of cue points, each containing name (text) and time ('78s', '1:18') */
  cuePoints?: cuePointType[];
  /** Content of heading */
  children?: React.ReactNode;
}

const MultimediaPlayer = ({
  shareUrl = '',
  figcaption = '',
  poster = '',
  title = '',
  sources = [],
  trackSrclang = '',
  trackLabel = '',
  trackSrc = 'text/html',
  trackDataType = '',
  cuePoints = [],
  children,
}: MultimediaPlayerProps) =>
  sources[0].type === 'mp4' || sources[0].type === 'webm' ? (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareUrl === '' ? '' : `{"shareUrl": "${{ shareUrl }}"}`}
      >
        <video poster={poster} title={title}>
          {sources.map(({ type, source }) =>
            type === 'mp4' || type === 'webm' ? (
              <source type={`video/${type}`} src={source} />
            ) : (
              'ERROR: invalid source'
            )
          )}
          <track
            src={trackSrc}
            kind="captions"
            data-type={trackDataType}
            srcLang={trackSrclang}
            label={trackLabel}
          />
        </video>
        {cuePoints.map(({ name, time }) =>
          name === '' ? (
            <button
              className="btn btn-info cuepoint"
              type="button"
              data-cuepoint={time}
            >
              Cue point - {time}
            </button>
          ) : (
            <button
              className="btn btn-info cuepoint"
              type="button"
              data-cuepoint={time}
            >
              {name} - {time}
            </button>
          )
        )}
        <figcaption>{figcaption}</figcaption>
      </figure>
    </span>
  ) : sources[0].type === 'youtube' ? (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareUrl === '' ? '' : `{"shareUrl": "${{ shareUrl }}"}`}
      >
        <video title={title}>
          <source type="video/youtube" src={sources[0].source} />
          <track kind="captions" />
        </video>
        <figcaption>{figcaption}</figcaption>
      </figure>
    </span>
  ) : (
    <span>
      {children}
      <figure
        className="wb-mltmd"
        data-wb-mltmd={shareUrl === '' ? '' : `{"shareUrl": "${{ shareUrl }}"}`}
      >
        <audio title={title}>
          {sources.map(({ type, source }) =>
            type === 'mp3' || type === 'ogg' ? (
              <source type={`audio/${type}`} src={source} />
            ) : (
              'ERROR: invalid source'
            )
          )}
          <track kind="captions" />
        </audio>
        <figcaption>{figcaption}</figcaption>
      </figure>
    </span>
  );

MultimediaPlayer.displayName = 'MultimediaPlayer';

export default MultimediaPlayer;
