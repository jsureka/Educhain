import Image from 'next/image';
import styles from 'styles/Course.module.scss';
import Navbar from 'components/navbar/navbar';
import image from '../../../public/quizButton.png'

export default function Course() {
    return (
        <div>
            <Navbar></Navbar>
            <div className={styles.bgcolor}>
                <div className={styles.course}>
                    <h1>Learn <br /> Blockchain</h1>
                </div>
                <div className={styles.answers}>
                    <div className="grid grid-cols-12 gap-2">
                        <div className={styles.lesson}>
                            LESSON
                            <div className={styles.lessonNum}>1</div>
                        </div>
                        <div className={styles.lessonDetails}>
                            Learn about Alchemy's Road to Web3 series, a 10 week, self-paced Web3 developer program to help new blockchain devs go from beginner to advanced.
                        </div>
                        <div className={styles.takeorquiz}>
                            <button class={styles.take}>
                                VIEW LESSON
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button class={styles.quiz}>
                                TAKE QUIZ
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className={styles.hr}></hr>
                    <div className="grid grid-cols-12 gap-2">
                        <div className={styles.lesson}>
                            LESSON
                            <div className={styles.lessonNum}>2</div>
                        </div>
                        <div className={styles.lessonDetails}>
                            Buy me a coffee is a popular website that all kinds of people use to create a landing page where anyone can send some amount of money.
                        </div>
                        <div className={styles.takeorquiz}>
                            <button class={styles.take}>
                                VIEW LESSON
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button class={styles.quiz}>
                                TAKE QUIZ
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className={styles.hr}></hr>
                    <div className="grid grid-cols-12 gap-2">
                        <div className={styles.lesson}>
                            LESSON
                            <div className={styles.lessonNum}>3</div>
                        </div>
                        <div className={styles.lessonDetails}>
                            Make a NFT on chain is a basic of blockchain game that drastically reduce gas cost. Make one of your own today!
                        </div>
                        <div className={styles.takeorquiz}>
                            <button class={styles.take}>
                                VIEW LESSON
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button class={styles.quiz}>
                                TAKE QUIZ
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className={styles.hr}></hr>
                    <div className="grid grid-cols-12 gap-2">
                        <div className={styles.lesson}>
                            LESSON
                            <div className={styles.lessonNum}>4</div>
                        </div>
                        <div className={styles.lessonDetails}>
                            In this tutorial, we are going to learn how to use the Alchemy NFT API to build an NFT gallery. So let's start now.
                        </div>
                        <div className={styles.takeorquiz}>
                            <button class={styles.take}>
                                VIEW LESSON
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <button class={styles.quiz}>
                                TAKE QUIZ
                                <svg xmlns="http://www.w3.org/2000/svg" class={styles.arrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}