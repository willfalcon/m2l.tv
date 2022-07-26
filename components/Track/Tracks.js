import React, { useEffect, useState } from 'react';

import VideoTrack from './VideoTrack';
import VideoModal from './VideoModal';

import useSiteContext from '../SiteContext';
import HoverStates from './HoverStates';

const Tracks = ({ topVideos, videoSlug }) => {
  const { setIsolate, toggleVideoModal } = useSiteContext();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/wp-json/m2l-video/v2/all-videos`);
      const data = await res.json();
      setVideos(data);

      if (videoSlug) {
        const openedVideo = videoSlug
          ? data
              .filter(cat => {
                return cat.videos.some(video => video.post_name === videoSlug);
              })[0]
              .videos.find(video => video.post_name === videoSlug)
          : null;

        setIsolate(openedVideo);
        toggleVideoModal(true);
      }
    }
    getVideos();
  }, []);

  const [hoverState, setHoverState] = useState([
    {
      id: 9718,
      video: {
        original: {
          url: 'https://videos.files.wordpress.com/r4i1cxMP/all-i-want-to-do-is-count.mp4',
        },
        width: 1920,
        height: 1080,
        videopress: {
          guid: 'r4i1cxMP',
          title: 'all-i-want-to-do-is-count-mp4',
          description: '',
          width: 1920,
          height: 1080,
          duration: 332117,
          display_embed: true,
          allow_download: false,
          rating: 'G',
          poster: 'https://videos.files.wordpress.com/r4i1cxMP/all-i-want-to-do-is-count_mp4_hd_1080p.original.jpg',
          original: 'https://videos.files.wordpress.com/r4i1cxMP/all-i-want-to-do-is-count.mp4',
          watermark: false,
          bg_color: false,
          files: {
            std: {
              mp4: 'all-i-want-to-do-is-count_mp4_std.mp4',
              original_img: 'all-i-want-to-do-is-count_mp4_std.original.jpg',
              thumbnail_img: 'all-i-want-to-do-is-count_mp4_std.thumbnail.jpg',
            },
            avc_240p: {
              mp4: 'all-i-want-to-do-is-count_mp4_avc_240p.mp4',
              original_img: 'all-i-want-to-do-is-count_mp4_avc_240p.original.jpg',
              thumbnail_img: 'all-i-want-to-do-is-count_mp4_avc_240p.thumbnail.jpg',
              hls: 'all-i-want-to-do-is-count_mp4_avc_240p.master.m3u8',
              dash: 'all-i-want-to-do-is-count_mp4_avc_240p.dash.mpd',
            },
            dvd: {
              mp4: 'all-i-want-to-do-is-count_mp4_dvd.mp4',
              original_img: 'all-i-want-to-do-is-count_mp4_dvd.original.jpg',
              thumbnail_img: 'all-i-want-to-do-is-count_mp4_dvd.thumbnail.jpg',
              hls: 'all-i-want-to-do-is-count_mp4_dvd.master.m3u8',
              dash: 'all-i-want-to-do-is-count_mp4_dvd.dash.mpd',
            },
            hd: {
              mp4: 'all-i-want-to-do-is-count_mp4_hd.mp4',
              original_img: 'all-i-want-to-do-is-count_mp4_hd.original.jpg',
              thumbnail_img: 'all-i-want-to-do-is-count_mp4_hd.thumbnail.jpg',
              hls: 'all-i-want-to-do-is-count_mp4_hd.master.m3u8',
              dash: 'all-i-want-to-do-is-count_mp4_hd.dash.mpd',
            },
            hd_1080p: {
              mp4: 'all-i-want-to-do-is-count_mp4_hd_1080p.mp4',
              original_img: 'all-i-want-to-do-is-count_mp4_hd_1080p.original.jpg',
              thumbnail_img: 'all-i-want-to-do-is-count_mp4_hd_1080p.thumbnail.jpg',
              hls: 'all-i-want-to-do-is-count_mp4_hd_1080p.master.m3u8',
              dash: 'all-i-want-to-do-is-count_mp4_hd_1080p.dash.mpd',
            },
          },
          file_url_base: {
            http: 'http://videos.videopress.com/r4i1cxMP/',
            https: 'https://videos.files.wordpress.com/r4i1cxMP/',
          },
          blog_id: 202592704,
          post_id: 9540,
          is_private: false,
          privacy_setting: 2,
          upload_date: '2022-07-05T16:58:51+0000',
          finished: true,
          files_status: {
            std: {
              mp4: 'DONE',
              ogg: 'DONE',
            },
            avc_240p: {
              mp4: 'DONE',
            },
            dvd: {
              mp4: 'DONE',
            },
            hd: {
              mp4: 'DONE',
            },
            hd_1080p: {
              mp4: 'DONE',
            },
            hd_1080p_compat: null,
            hevc_1440p: null,
            vp9_1440p: null,
            hevc_2160p: null,
            vp9_2160p: null,
          },
          subtitles: [],
          tracks: [],
          adaptive_streaming: 'https://videos.files.wordpress.com/r4i1cxMP/all-i-want-to-do-is-count_mp4.adaptive_4.m3u8',
          adaptive_streaming_r: null,
          format_meta: {
            std: {
              codec: 'avc',
              label: '224p',
              vertical_lines: 224,
            },
            avc_240p: {
              codec: 'avc',
              label: '240p',
              vertical_lines: 240,
            },
            dvd: {
              codec: 'avc',
              label: '480p',
              vertical_lines: 480,
            },
            hd: {
              codec: 'avc',
              label: '720p',
              vertical_lines: 720,
            },
            hd_1080p: {
              codec: 'avc',
              label: '1080p',
              vertical_lines: 1080,
            },
            hevc_1440p: {
              codec: 'hevc',
              label: '1440p',
              vertical_lines: 1440,
            },
            vp9_1440p: {
              codec: 'vp9',
              label: '1440p',
              vertical_lines: 1440,
            },
            hevc_2160p: {
              codec: 'hevc',
              label: '4K',
              vertical_lines: 2160,
            },
            vp9_2160p: {
              codec: 'vp9',
              label: '4K',
              vertical_lines: 2160,
            },
          },
          thumbnails_grid: {
            grid_interval: 1000,
            grid_width: 10,
            grid_height: 10,
            thumbs_height: 288,
            files: [
              {
                file: 'all-i-want-to-do-is-count_mp4.thumbgrid_0.jpg',
                start_time_ms: 0,
                end_time_ms: 100000,
                thumbs_count: 100,
              },
              {
                file: 'all-i-want-to-do-is-count_mp4.thumbgrid_1.jpg',
                start_time_ms: 100000,
                end_time_ms: 200000,
                thumbs_count: 100,
              },
              {
                file: 'all-i-want-to-do-is-count_mp4.thumbgrid_2.jpg',
                start_time_ms: 200000,
                end_time_ms: 300000,
                thumbs_count: 100,
              },
              {
                file: 'all-i-want-to-do-is-count_mp4.thumbgrid_3.jpg',
                start_time_ms: 300000,
                end_time_ms: 332000,
                thumbs_count: 32,
              },
            ],
          },
          thumbnail_generating: false,
        },
        file_statuses: {
          ogg: 'DONE',
          mp4: 'DONE',
          dvd: 'DONE',
          hd: 'DONE',
          hd_1080p: 'DONE',
        },
      },
      post_title: 'Counting',
      m2l_cat: {
        term_id: 30,
        name: 'Pre-K',
        slug: 'pre-k',
        term_group: 0,
        term_taxonomy_id: 30,
        taxonomy: 'm2l_category',
        description: '',
        parent: 0,
        count: 10,
        filter: 'raw',
        term_order: '1',
      },
      tags: [
        {
          term_id: 35,
          name: 'Learning',
          slug: 'learning',
          term_group: 0,
          term_taxonomy_id: 35,
          taxonomy: 'm2l_tag',
          description: '',
          parent: 0,
          count: 3,
          filter: 'raw',
          term_order: '0',
        },
        {
          term_id: 34,
          name: 'Physical Education',
          slug: 'physical-education',
          term_group: 0,
          term_taxonomy_id: 34,
          taxonomy: 'm2l_tag',
          description: '',
          parent: 0,
          count: 3,
          filter: 'raw',
          term_order: '0',
        },
      ],
      pos: {
        x: 402,
        y: 294,
        width: 272,
        height: 198,
        top: 294,
        right: 674,
        bottom: 492,
        left: 402,
      },
      scroll: 482,
    },
  ]);
  console.log(hoverState);

  return (
    <>
      <VideoTrack videos={topVideos.slice(1)} label="Top Videos" setHoverState={setHoverState} hoverState={hoverState} />
      {videos.map(track => (
        <VideoTrack key={track.term_id} {...track} setHoverState={setHoverState} hoverState={hoverState} />
      ))}
      <VideoModal />
      <HoverStates hoverState={hoverState} setHoverState={setHoverState} />
    </>
  );
};

export default Tracks;
