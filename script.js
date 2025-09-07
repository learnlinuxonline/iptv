let hls = null;
let retryCount = 0;
const MAX_RETRIES = 3;
let currentChannel = null;
let pipWindow = null;

const allChannels = [
  // Channel 24 
  {
    name: 'Channel 24',
    stream: '',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Channel24logo.svg/250px-Channel24logo.svg.png',
    hd: true,
    category: 'news'
  },
  
  // Deepto TV
  {
    name: 'Deepto TV',
    stream: 'https://byphdgllyk.gpcdn.net/hls/DeeptoTV/index.m3u8',
    logo: 'https://images.seeklogo.com/logo-png/51/1/deepto-tv-logo-png_seeklogo-513994.png',
    hd: true,
    category: 'entertainment'
  },
  
  // Channel 9
  {
    name: 'Channel 9',
    stream: 'https://mtv.sunplex.live/MAASRANGA-TV/tracks-v1a1/mono.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/ff/Channel9_bd.svg',
    hd: true,
    category: 'entertainment'
  },
  
  // My TV
  {
    name: 'My TV',
    stream: 'https://mytvbangla.com/0.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/My_TV_Logo.svg/120px-My_TV_Logo.svg.png?20211022082858',
    hd: true,
    category: 'news'
  },
 
  // ATN Bangla
  {
    name: 'ATN Bangla',
    stream: 'https://mtv.sunplex.live/MAASRANGA-TV/tracks-v1a1/mono.m3u8',
    logo: 'https://logowik.com/content/uploads/images/atn-bangla2574.logowik.com.webp',
    hd: true,
    category: 'entertainment'
  },
  
  // BanglaVision
  {
    name: 'BanglaVision',
    stream: 'https://deshitv.deshitv24.net/live/myStream/playlist.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Banglavision.svg/800px-Banglavision.svg.png',
    hd: true,
    category: 'news'
  },
  
  // Gazi TV
  {
    name: 'Gazi TV',
    stream: 'https://ekusheyserver.com/etvlivesn.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Logo_of_GTV_%28Bangladesh%29.svg/800px-Logo_of_GTV_%28Bangladesh%29.svg.png',
    hd: true,
    category: 'entertainment'
  },
  
  // Ekattor TV
  {
    name: 'Ekattor TV',
    stream: 'https://deshitv.deshitv24.net/live/myStream/playlist.m3u8',
    logo: 'https://e7.pngegg.com/pngimages/861/476/png-clipart-bangladesh-ekattor-tv-television-channel-atn-news-others-miscellaneous-television-thumbnail.png',
    hd: true,
    category: 'news'
  },

  // N TV
  {
    name: 'N TV',
    stream: 'https://ekusheyserver.com/etvlivesn.m3u8',
    logo: 'https://images.seeklogo.com/logo-png/39/1/ntv-channel-logo-png_seeklogo-396286.png',
    hd: true,
    category: 'entertainment'
  },
  
  // R TV
  {
    name: 'R TV',
    stream: 'https://deshitv.deshitv24.net/live/myStream/playlist.m3u8',
    logo: 'https://www.freekaj.com/assets/images/stock/image/2024/01/14/65a4440b4cc651705264139.jpg',
    hd: true,
    category: 'news'
  },

  // Somoy TV
  {
    name: 'Somoy TV',
    stream: 'https://ekusheyserver.com/etvlivesn.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/bn/f/f6/%E0%A6%B8%E0%A6%AE%E0%A6%AF%E0%A6%BC_%E0%A6%9F%E0%A6%BF%E0%A6%AD%E0%A6%BF%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg',
    hd: true,
    category: 'entertainment'
  },
  
  // Independent TV
  {
    name: 'Independent TV',
    stream: 'https://ekusheyserver.com/etvlivesn.m3u8',
    logo: 'https://e7.pngegg.com/pngimages/500/179/png-clipart-bangladesh-logo-independent-television-television-channel-bd-logo-television-text-thumbnail.png',
    hd: true,
    category: 'entertainment'
  },
  
  // Boishakhi TV
  {
    name: 'Boishakhi TV',
    stream: 'https://boishakhi.sonarbanglatv.com/boishakhi/boishakhitv/index.m3u8',
    logo: 'https://imgs.search.brave.com/ftBsn0j_Ar2Y9yaJ5jUTezm_J6SXkyW-D2WxzDc--TQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzE7LzEvYm9pc2hh/a2hpLXR2LWxvZ28t/cG5nX3NlZWtsb2dv/LTE3NTY0NC5wbmc_/dj0xOTU1NTQ3ODI2/OTI5NTEzMzYw',
    hd: true,
    category: 'entertainment'
  },
  
  // Ekushey TV
  {
    name: 'Ekushey TV',
    stream: 'https://ekusheyserver.com/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8',
    logo:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Ekushey_Television_Logo.svg/248px-Ekushey_Television_Logo.svg.png?20211105182647',
    hd: true,
    category: 'entertainment'
  },
  
  // Star Sports 1 HD
  {
    name: 'Star sports 1 hd',
    stream: 'http://41.205.93.154/STARSPORTS1/index.m3u8',
    logo:'https://i.imgur.com/E5jjKHI.png',
    hd: true,
    category: 'entertainment'
  },
  
  // AXN HD
  {
    name: 'AXN HD',
    stream: 'http://125hvt.ddns.net:21585/axn/index.m3u8',
    logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AXN_logo_%282015%29.svg/512px-AXN_logo_%282015%29.svg.png',
    hd: true,
    category: 'entertainment'
  },
  
  // Sony Cine HD
  {
    name: 'Sony Cine HD',
    stream: 'https://a-cdn.klowdtv.com/live1/cine_720p/playlist.m3u8',
    logo:'https://i.imgur.com/bZWoDTg.png',
    hd: true,
    category: 'entertainment'
  },
  
  // FIFA+ HD
  {
    name: 'FIFA+ HD',
    stream: 'https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLmV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8',
    logo: 'https://i.imgur.com/l5iax42.png',
    hd: true,
    category: 'entertainment'
  },
  
  // Sony KAL Hindi
  {
    name: 'Sony KAL Hindi',
    stream: 'https://spt-sonykal-1-us.xumo.wurl.tv/playlist.m3u8',
    logo: 'https://i.imgur.com/9Qq8DKh.png',
    hd: true,
    category: 'entertainment'
  },
  
  // TSports HD
  {
    name: 'TSports HD',
    stream: 'https://live.tsports.com/mobile_hls/tsports_live_1/playlist.m3u8',
    logo: 'https://image.tsports.com/images/mobile_thumbnail/1750066241-1280.jpg',
    hd: true,
    category: 'entertainment'
  },
  
  // 2 TV
  {
    name: '2 TV',
    stream: 'https://tv.cdn.xsg.ge/gpb-2tv/index.m3u8',
    logo: 'https://i.imgur.com/UHp79CN.png',
    hd: true,
    category: 'entertainment'
  },
  
  // 2X2
  {
    name: '2X2',
    stream: 'https://livetv.mylifeisgood.net.ru/channels/2x2.m3u8',
    logo: 'https://i.imgur.com/fhQFLEl.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // 9XM
  {
    name: '9XM',
    stream: 'https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/9xm/23886666-8fc5-470f-aab1-bd637ed607b1/3.m3u8',
    logo: 'https://i.imgur.com/F17QtN2.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // 24 Hour Free Movies
  {
    name: '24 Hour Free Movies',
    stream: 'https://d1j2u714xk898n.cloudfront.net/scheduler/scheduleMaster/145.m3u8',
    logo: 'https://i.imgur.com/iSVnzR1.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // 4U TV
  {
    name: '4U TV',
    stream: 'https://hls.4utv.live/hls/stream.m3u8',
    logo: 'https://i.imgur.com/PexhKwp.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // 30A Music
  {
    name: '30A Music',
    stream: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
    logo: 'https://i.imgur.com/gNWg9tl.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // 360° News
  {
    name: '360° News',
    stream: 'https://live-vgtrksmotrim.cdnvideo.ru/vgtrksmotrim/smotrim-live-03-srt.smil/playlist.m3u8',
    logo: 'https://i.imgur.com/YXDeX8q.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // A2Z
  {
    name: 'A2Z',
    stream: 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5.m3u8',
    logo: 'https://i.imgur.com/1zsdloF.png',
    hd: true,
    category: 'Cartoon'
  },
  
  // Movies Action
  {
    name: 'Movies Action',
    stream: 'https://shls-live-enc.edgenextcdn.net/out/v1/46079e838e65490c8299f902a7731168/index.m3u8',
    logo: 'https://i.imgur.com/NIVhISa.png',
    hd: true,
    category: 'Movies'
  },
  
  // Classic Movies Channel
  {
    name: 'Classic Movies Channel',
    stream: 'http://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/561c5b0dada51f8004c4d855/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=6c27e003-30d3-11ef-9cf5-e9ddff8ff496&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=7911819c-67eb-4f58-944f-5c6c6d4d937d',
    logo: 'https://i.imgur.com/pQJxov2.png',
    hd: true,
    category: 'Movies'
  },
  
  // Pluto TV Crime Movies
  {
    name: 'Pluto TV Crime Movies',
    stream: 'https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/5f4d8594eb979c0007706de7/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=6c2aed41-30d3-11ef-9cf5-e9ddff8ff496&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=e4d2554e-9b84-4086-8e1d-07f64310a23b',
    logo: 'https://i.imgur.com/SJcqknt.png',
    hd: true,
    category: 'Movies'
  },
  
  // Rakuten TV Action Movies
  {
    name: 'Rakuten TV Action Movies',
    stream: 'https://54045f0c40fd442c8b06df076aaf1e85.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6065/master.m3u8',
    logo: 'https://i.imgur.com/Meew6eX.png',
    hd: true,
    category: 'Movies'
  }
];

const container = document.getElementById('channelContainer');
const pipButton = document.getElementById('pipButton');
const video = document.getElementById('tvPlayer');

// Check if Picture-in-Picture is supported
function checkPipSupport() {
  if (document.pictureInPictureEnabled) {
    pipButton.disabled = false;
    pipButton.textContent = 'পিকচার ইন পিকচার';
  } else {
    pipButton.textContent = 'পিকচার ইন পিকচার সাপোর্ট করে না';
  }
}

// Toggle Picture-in-Picture mode
async function togglePip() {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      pipButton.textContent = 'পিকচার ইন পিকচার';
    } else {
      await video.requestPictureInPicture();
      pipButton.textContent = 'পিকচার ইন পিকচার বন্ধ করুন';
    }
  } catch (error) {
    console.error('Picture-in-Picture error:', error);
  }
}

// Initialize PiP button
pipButton.addEventListener('click', togglePip);

function renderChannels(filter = '') {
  container.innerHTML = '';
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  allChannels
    .filter(ch => ch.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(ch => {
      const card = document.createElement('div');
      card.className = 'channel-card';
      card.onclick = () => playTV(ch.stream, ch.name);
      const fav = favs.includes(ch.name) ? '★' : '☆';
      card.innerHTML = `
        <button class="favorite-btn" onclick="toggleFavorite(event, '${ch.name}')">${fav}</button>
        <img class="channel-icon" src="${ch.logo}" alt="${ch.name}">
        <div class="channel-title">${ch.name}</div>
        ${ch.hd ? '<div class="channel-badge">HD</div>' : ''}
      `;
      container.appendChild(card);
    });
}

function toggleFavorite(e, name) {
  e.stopPropagation();
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.includes(name)) {
    favs = favs.filter(n => n !== name);
  } else {
    favs.push(name);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  renderChannels(document.getElementById('searchInput').value);
}

function filterChannels() {
  const val = document.getElementById('searchInput').value;
  renderChannels(val);
}

function updateStatus(message) {
  document.getElementById('statusMessage').textContent = message;
}

function showError(message) {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('loadingSpinner').style.display = 'none';
}

function showLoading() {
  document.getElementById('loadingSpinner').style.display = 'block';
  document.getElementById('errorMessage').textContent = '';
}

function playTV(streamURL, channelName) {
  currentChannel = channelName;
  showLoading();
  updateStatus('স্ট্রিম লোড হচ্ছে...');
  retryCount = 0;

  if (hls) {
    hls.destroy();
    hls = null;
  }

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(streamURL);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      updateStatus(`লাইভ: ${channelName}`);
      video.play();
      document.getElementById('loadingSpinner').style.display = 'none';
      
      // Enable PiP button when video is ready
      if (document.pictureInPictureEnabled) {
        pipButton.disabled = false;
      }
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal && retryCount < MAX_RETRIES) {
        retryCount++;
        updateStatus(`রিট্রাই করা হচ্ছে (${retryCount})`);
        hls.startLoad();
      } else {
        showError('স্ট্রিম চালু করা যাচ্ছে না');
        pipButton.disabled = true;
      }
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamURL;
    video.addEventListener('loadedmetadata', function () {
      video.play();
      updateStatus(`লাইভ: ${channelName}`);
      document.getElementById('loadingSpinner').style.display = 'none';
      
      // Enable PiP button when video is ready
      if (document.pictureInPictureEnabled) {
        pipButton.disabled = false;
      }
    });
  } else {
    showError('আপনার ব্রাউজার এই স্ট্রিম সাপোর্ট করে না');
    pipButton.disabled = true;
  }
}

// Exit PiP when page is hidden (optional)
document.addEventListener('visibilitychange', () => {
  if (document.hidden && document.pictureInPictureElement) {
    // Don't exit PiP automatically - let user control it
  }
});

// Initialize
renderChannels();
checkPipSupport();