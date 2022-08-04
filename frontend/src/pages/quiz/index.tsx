import Image from 'next/image';
import styles from 'styles/Quiz.module.scss';
import Navbar from 'components/navbar/navbar';
import image from '../../../public/quizButton.png'

export default function Quiz() {
    return (
        <Navbar></Navbar>
        <div className={styles.bgcolor}>
            <div className={styles.heading}>
                <h1 className={styles.appName}>Take your time! Complete the Quiz</h1>
            </div>
            <div className={styles.ques}>
                <h1>Chlorine atom forms -</h1>
            </div>
            <div className={styles.answers}>
                <div className="grid grid-cols-2 gap-2">
                    <div className={styles.optionsL}>
                        <h1 className={styles.singleOptionL}>Covalent bond with Hydrogen</h1>
                    </div>
                    <div className={styles.optionsR}>
                        <h1 className={styles.singleOptionR}>Ionic bond with Calcium</h1>
                    </div>
                    <div className={styles.optionsL}>
                        <h1 className={styles.singleOptionL}>Ionic bond with Carbon</h1>
                    </div>
                    <div className={styles.optionsR}>
                        <h1 className={styles.singleOptionR}>Both A and B</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}