// components/ShareButtons.tsx
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from 'next-share';
  
  interface ShareButtonsProps {
    url: string;
    title: string;
  }



  const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
    return (
      <div className=' m-1'>
        <FacebookShareButton  url={url} quote={title}>
          <FacebookIcon className='mr-4' size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon className='mr-4' size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon className='mr-4' size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={url}>
            <WhatsappIcon className='mr-4' size={32} round />
        </WhatsappShareButton>
      </div>
    );
  };
  
  export default ShareButtons;