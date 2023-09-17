import React from 'react';
import Image from './Image';
import { FilePlus2, Trash, FolderPlus, RotateCw } from 'lucide-react';

import image from '../assets/videocms.png?w=100&quality=100&format=avif;webp;png&as=picture';
import { Button } from './ui/button';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-2 py-4">
            <Image image={image} alt="VideoCMS" width={50} height={50} />

            <nav className="flex h-2 items-center gap-4">
                <Button variant={'ghost'} className="group">
                    <RotateCw className="h-5 w-5 duration-0 ease-out group-active:animate-spin" />
                </Button>

                <Button variant={'ghost'}>
                    <FolderPlus className="mr-2 h-5 w-5" />
                    New Folder
                </Button>

                <Button>
                    <FilePlus2 className="mr-2 h-5 w-5" />
                    Upload File
                </Button>

                <Button variant={'destructive'}>
                    <Trash className="mr-2 h-5 w-5" />
                    Delete Item
                </Button>
            </nav>
        </header>
    );
};

Header.propTypes = {};

export default Header;
