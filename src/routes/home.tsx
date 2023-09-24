import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import { getFiles } from '@/util/files';
import { FileTable } from '@/components/filetable/FileTable';

const Home: React.FC = () => {
    const { isLoading, isError, data, error, isSuccess } = useQuery({
        queryKey: ['files'],
        queryFn: getFiles,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                <b>Error: </b>
                <span>{JSON.stringify(error)}</span>
            </div>
        );
    }

    if (isSuccess && data) {
        return (
            <>
                <Header />

                <FileTable data={data} />
            </>
        );
    }
};

Home.propTypes = {};

export default Home;
