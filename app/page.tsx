"use client"
// import "@fortawesome/fontawesome-svg-core/styles.css"; 
// import { config } from "@fortawesome/fontawesome-svg-core"; 
// import Header from './components/Header'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faAddressBook, faAddressCard, faBarChart, faBars, faCalendarAlt, faCheckCircle, faCogs, faCommentAlt, faCreditCard, faHamburger, faHome, faHomeAlt, faKey, faSignInAlt, faTachometer, faUserCog, faWrench } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import styles from '../styles/dashboard.module.css'
import { useContext, useRef, useState } from "react";

export default function Page() {


const [isMenu,setIsMenu] = useState(false)
  




  const openMenu = () =>{
    setIsMenu(!isMenu)
  }

  return (
<div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.sectionTop}>

            <div className="">
                <img src='logo.jpeg'  style={{width:50,height:50,borderRadius:25}} />
            </div>

            <div  className='absolute right-10 cursor-pointer lg:hidden  justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"' onClick={()=>openMenu()}>
                <i  
                  className="pi pi-bars hover:text-white" 
                  style={{ color: "orange",fontSize:24,marginRight:4 }}>
                  </i>

            </div>


            {isMenu && 
            <div className="absolute right-0 top-14 z-10 mt-2 w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                <div className="py-1" role="none">
                </div>
                <div className="py-1" role="none">
                </div>
                
            </div>
            }

            <ul className={styles.nav}>
                <li><Link className="a" href="#home">Home</Link></li>
                <li ><Link className="a" href="#service">Prerequest</Link></li>
                <li><Link className="a"  href="#about">About us</Link></li>
                <li><Link className="a"  href="#contact">Contact us</Link></li>
            </ul>

        </div>


        <div className={styles.headerContent} id="home">
            <div className={styles.leftContent}>
                <div className={styles.headerTitle}>Wilmic Microfinance: Small Loans, Big Dreams.</div>
                    <div style={{color:'#FFF'}}>
                        Wilmic Microfinance: Empowering communities through accessible financial services tailored to small businesses, fostering economic growth and financial inclusion
                    </div>

                    <div className={styles.phone1}>
                        <img src="./slog.jpeg"  />
                    </div>


                <div className={styles.auth}>
                    <Link href="/login" className={`${styles.btn} ${styles.login}`}>Log In <i className="pi pi-sign-in gray-400"></i> 
                    {/* <i className="fa fa-sign-in" aria-required="false" style="color:#777"></i> */}
                    </Link>
                </div>
            </div>

            <div>
                <img className={styles.phone} src="./slog.jpeg"  style={{width:250,borderRadius:10}} />
            </div>

        </div>
    </header>  
 

    <div className={styles.about} id="about">
        <div className={styles.aboutTitle} >About us</div>
        <div className={styles.aboutContent}>
        <div className={styles.aboutImage}>
            {/* <img src='logo.jpeg' className={styles.weImage} width="400px" /> */}
        </div>

        At Wilmic Microfinance, we believe in the power of financial inclusion to transform lives and communities. Our mission is to provide accessible financial services to individuals and small businesses who are traditionally underserved by mainstream banks.

Through our range of loan products, we support aspiring entrepreneurs and existing businesses alike, helping them realize their dreams and achieve financial stability. Whether you need capital to start a new venture, expand an existing business, or meet unexpected expenses, we're here to help.

    </div>
    </div>


    <div className={styles.serviceTitle} id="service">
       
    <i 
     className="pi pi-cog fa-check hover:text-white" 
                  style={{ color: "orange",fontSize:24,marginRight:4 }} ></i>
prerequest to loan</div>

    <div className={styles.service}>

        <div className={styles.serviceVard}>
            <div className={styles.serviceHeader}> 
            Valid identification documents</div>
        </div>

        <div className={styles.serviceVard}>

            <div className={styles.serviceHeader}> 

            Clear understanding of loan terms and repayment schedule</div>
        </div>


      <div className={styles.serviceVard}>
          <div className={styles.serviceHeader}>
              <span>Business plan or purpose for the loan.</span></div>
          </div>

      <div className={styles.serviceVard}>

          <div className={styles.serviceHeader}> 
          Good credit history, if applicable</div>

      </div>

      <div className={styles.serviceVard}>

          <div className={styles.serviceHeader}> 
          Collateral, if required for the type of loan.
          </div>   
      </div>





      </div>


    <div className={`${styles.us} ${styles.reveal}`}>
        <div>
        <div className={styles.title}>Why Choose us?</div>
        <div className={styles.usContent}>
        We understand that every financial need is unique. That's why we offer personalized loan products and flexible repayment plans to suit your specific circumstances and goals.
        <br />
        We know your time is valuable. Our streamlined application process ensures quick approval and disbursement of funds, so you can focus on what matters most – growing your business.
        </div>
   
    </div>
        <div className={styles.auth}>
            <Link href="/signup">
                <button className={`${styles.btn} ${styles.signup}`}>Sign Up</button>
            </Link>
            <Link href="/login">
                <button className={`${styles.btn} ${styles.login}`}>Log In 
                    <i className="pi pi-sign-in"></i>
                    </button>
            </Link>
        </div>

        <div>Start for free, no obligations. Sign up today and revolutionize the way you connect with your audience.</div>
    </div>


    <div className={styles.footer} id="contact">
        <div>
            <div className={styles.footerTitle}>Get in Touch</div>
            <div>
            WILMIC GENERAL & MICROFINANCE <br/>
TIN 109-745-367<br />
VRN 40-046815-I<br /><br />
Office <br />
TOGO TOWER KINONDONI MANYANYA NEAR TIGER TOWER ALONG KINONDONI ROAD.
<br />
<br />
            </div>
            <div>
Call 0715467827/0762707670

            </div>
        </div>
    </div>

    <div className={styles.copyright}>
        <p className={styles.copy}>&copy; 2024 wilmic.co.tz</p>
    </div>



</div>
  )
}



