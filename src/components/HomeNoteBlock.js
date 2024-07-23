"use client";
import { useState, useEffect } from 'react';
import { getBlocks } from "@/action/backendApi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeNoteBlock = () => {
    const [notesBlock, setNotesBlock] = useState(null);
    const [serviceBlock, setServiceBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const blocks = await getBlocks();
                if (blocks) {
                    blocks.forEach(block => {
                        if (block.identifier === "notes_block") {
                            setNotesBlock(block.content);
                        }
                        if (block.identifier === "service_block") {
                            setServiceBlock(block.content);
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching blocks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlocks();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='container notes-block-wrap'>
                    <Skeleton height={380} width="100%" />
                </div>
            ) : (
                <p dangerouslySetInnerHTML={{ __html: notesBlock }} />
            )}
            {isLoading ? (
                <div className='container service-block-wrap'>
                    <Skeleton height={264} width="100%" />
                </div>
            ) : (
                <p dangerouslySetInnerHTML={{ __html: serviceBlock }} />
            )}
        </>
    );
};

export default HomeNoteBlock;
