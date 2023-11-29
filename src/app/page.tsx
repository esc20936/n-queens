"use client";
import Image from 'next/image'
import { useRef, useState } from 'react'
import solveNQueens from "@/utils/nQueens";
import { motion } from 'framer-motion'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [board, setBoard] = useState<string[][][]>([[[]]]);
  const [first, setFirst] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputClick = () => {
    inputRef.current?.focus();
  }

  const handleButtonClick = () => {

    setFirst(false);
    setLoading(true);

    const input = inputRef.current?.value;
    if (!input) {
      setErrorMessage('Please enter a number');
      setBoard([[[]]]);
      setFirst(true);
      setLoading(false);
      return;
    }

    if (isNaN(parseInt(input))) {
      setErrorMessage('Please enter a valid number');
      setBoard([[[]]]);
      setLoading(false);
      setFirst(true);
      return;
    }

    if (!(parseInt(input) === 1 || parseInt(input) >= 4) ) {
      setErrorMessage('Please enter a number greater than 3');
      setBoard([[[]]]);
      setLoading(false);
      setFirst(true);

      return;
    }

    if (parseInt(input) > 10) {
      setErrorMessage('Please enter a number smaller than 11');
      setBoard([[[]]]);
      setLoading(false);
      setFirst(true);
      return;
    }

    setErrorMessage('');
    const value = parseInt(input);

    const result = solveNQueens(value);

    if (result.length === 0) {
      setLoading(false);
      setErrorMessage('No solution found');
      return;
    }

    setLoading(false);
    setBoard(result);

  }


  return (
    <main className="flex min-h-screen w-full bg flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <div className='flex flex-col w-full items-center justify-center gap-8'>
        <h1 className="text-6xl font-bold text-white font-title">N Queens</h1>
        {/* input */}
        <div className="flex flex-row w-3/4 md:w-1/2 h-[30px] rounded-lg bg-zinc-600/30 justify-center"
          onClick={handleInputClick}
        >
          <input className="w-5/6 bg-transparent text-white focus:outline-none" placeholder="Enter a number" ref={inputRef} />
        </div>
        <p className="text-white text-opacity-50">{errorMessage}</p>
        {/*blue button */}
        <button className="flex flex-row w-1/2 md:w-1/4 h-[50px] rounded-lg bg-zinc-600/30 justify-center items-center hover:bg-blue-500 hover:transition-all hover:scale-110 ease-in-out duration-100"
          onClick={handleButtonClick}
        >
          <p className="text-white">Solve</p>
        </button>

        {/* solutions */}
        <div className="flex flex-col w-full items-center justify-center gap-8">
          <BoardDisplay solutions={board} first={first} />;

        </div>


      </div>
    </main>
  )
}

const BoardDisplay = ({ solutions, first }: { solutions: string[][][], first: boolean }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8">
      {/* amount of solutions */}
      {
        !first && <p className="text-white text-opacity-50">Amount of solutions: {solutions.length}</p>

      }

      {solutions.map((solution, index) => {
        return (
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 0.65 }}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
            },
            hidden: { opacity: 0.6, scale: 0.6 },
          }}
          
          key={index} className="flex flex-col w-full items-center justify-center gap-8">

            {
              !first &&  <h1 key={index} className="text-2xl font-bold text-white font-title">Solution {index + 1}</h1>

            }
           
            {solution.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex flex-row w-3/4 md:w-1/2 justify-center items-center gap-2">
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`w-8 h-8 ${cell === '.' ? 'bg-zinc-600' : 'bg-white'}`}
                    ></div>
                  ))}
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};
