// components/navConfig.ts
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Image from 'next/image';

export const navConfig = [
  { name: "होमपेज", path: "/" },
  { name: "राजनीति", path: "/politics" },
  { name: "प्रविधि", path: "/technology" },
  { name: "साहित्य", path: "/literature" },
  { name: "अर्थ", path: "/economy" },
  { name: "सम्पादकीय", path: "/editorial" },
  { name: "बिचार", path: "/opinion" },
  { name: "प्रदेश", path: "/state" },
  { name: "खेलकुद", path: "/sports" },
  { name: "रोजगार", path: "/employment" },
  { name: "मनोरंजन", path: "/entertainment" },
  { name: "सुरक्षा", path: "/security" },
  { name: "अन्य", path: "/others" },
  {
    name: <Tooltip>
      <TooltipTrigger className='flex items-center justify-center cursor-pointer'>
        <Image src={'/images/homepage/letter.svg'} alt='Write news' width={16} height={16} />
      </TooltipTrigger>
      <TooltipContent className='bg-text-color'>
        <p>समाचार लेख्नुहोस</p>
      </TooltipContent>
    </Tooltip>,
    path: '/sign-up'
  }
];

export const othersDropdownConfig = [
  { name: 'पर्यटन', path: '/tourism' },
  { name: 'स्वास्थ्य', path: '/health' },
  { name: 'शिक्षा', path: '/education' },
  { name: 'अन्तराष्ट्रिय', path: '/international' }
];

export const mobileNav = [
  { name: "होमपेज", path: "/" },
  { name: "राजनीति", path: "/politics" },
  { name: "प्रबिधि", path: "/technology" },
  { name: "साहित्य", path: "/literature" },
  { name: "अर्थ", path: "/economy" },
  { name: "सम्पादकीय", path: "/editorial" },
  { name: "बिचार", path: "/opinion" },
  { name: "प्रदेश", path: "/state" },
  { name: "खेलकुद", path: "/sports" },
  { name: "रोजगार", path: "/employment" },
  { name: "मनोरंजन", path: "/entertainment" },
  { name: "सुरक्षा", path: "/security" },
  { name: 'पर्यटन', path: '/tourism' },
  { name: 'स्वास्थ्य', path: '/health' },
  { name: 'शिक्षा', path: '/education' },
  { name: 'अन्तराष्ट्रिय', path: '/international' },
  { name: "समाचार लेख्नुहोस", path: '/sign-up' }
];