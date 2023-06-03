import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const id = 4;
      const url = `http://localhost:3000/professional/availableSchedules?id=${id}&date=${encodeURIComponent(new Date(selectedDate).toLocaleDateString('en-CA'))}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const jsonData = await response.json();

          if (Array.isArray(jsonData)) {
            setData(jsonData as never[]);
          } else {
            setData([]);
          }
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  const handleDateChange = (event: { target: { value: string; }; }) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = (item: string) => {
    console.log('Button clicked for item:', item);
    // Perform desired action with the clicked item
  };

  const formatDate = (dateString: string) => {
    const date = new Date(formatDateString(dateString));
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateString = (dateString: string) => {
    if (typeof dateString === 'string') {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    return dateString;
  };

  const currentDate = new Date();
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const currentDateString = currentDate.toISOString().split('T')[0];
  const nextMonthDateString = nextMonthDate.toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>Agendei - Testes</title>
      </Head>
      <main className={styles.background}>
        <div className="container text-center">
          <h1>Testes</h1>
          <div className="row">
            <div className="col">
              <DayPicker
                mode="single"
                onDayClick={(day) => handleDateChange({ target: { value: day.toString() } })}
                locale={ptBR}
                defaultMonth={new Date()} fromYear={2023} toYear={2023} 
              />
              </div>
              {data.length > 0 && (
                <div className="col">
                  <h2>Data returned for {formatDate(selectedDate)}:</h2>
                    {data.map((item) => (
                        <button key={item} className={styles.button} onClick={() => handleButtonClick(item)}>{item}</button>
                    ))}
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
