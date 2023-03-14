import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { LikesForGraph } from '../../helpers/reportQueries';
import './Reports.css'
import { CSVDownload, CSVLink } from "react-csv";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Vacations Likes Bar Chart',
        },
    },
    scales: {
        y: {
            ticks: {
                precision: 0
            }
        }
    }
};


export function Reports() {
    const useLikesForGraph = LikesForGraph();
    console.log(useLikesForGraph.data);


    const labels = useLikesForGraph.data?.map((likes: any) => {
        return likes.destination
    })

    const likes = useLikesForGraph.data?.map((likes: any) => {
        return likes.likes
    });

    const dataArray = useLikesForGraph.data || [];
    const csvData = Array.from(dataArray, (d: any) => [d.destination, d.likes]);

    const data = {
        labels,
        datasets: [
            {
                label: 'Likes',
                data: likes,
                backgroundColor: 'rgb(138, 170, 229)',
            },
        ],
    };

    

    return (
        <div className='Reports'>
            {useLikesForGraph.isLoading ?
                "Loading..."
                : useLikesForGraph.isSuccess ?
                    <div className='likesGraph'>

                        <Bar options={options} data={data} />
                    </div>
                    : useLikesForGraph.isError ?
                        "Error" : <></>}
            <div className='downloadToCsvFileDiv'>

                <CSVLink filename='vacation_likes' data={csvData} headers={['destinations', 'followers']}>
                    Download to csv file
                </CSVLink>
            </div>
        </div>
    )
}
