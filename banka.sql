--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-04-20 15:40:55

--
-- TOC entry 197 (class 1259 OID 49190)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

 CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    accountnumber BIGINT UNIQUE NOT NULL,
    createdon TIMESTAMP NOT NULL,
    owner INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    balance NUMERIC(250, 2) DEFAULT 0.00
  );


--
-- TOC entry 198 (class 1259 OID 49201)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL,
    accountnumber BIGINT REFERENCES accounts("accountNumber") ON DELETE CASCADE,
    cashier INTEGER REFERENCES users(id),
    amount NUMERIC(250, 2) NOT NULL,
    oldbalance NUMERIC(250, 2) NOT NULL,
    newbalance NUMERIC(250, 2) NOT NULL
  ); 


--
-- TOC entry 196 (class 1259 OID 49182)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(250) UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    type VARCHAR(50) DEFAULT 'client',
    isadmin BOOLEAN DEFAULT NULL
  );

--
-- TOC entry 2697 (class 2606 OID 49208)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT cashier FOREIGN KEY (cashier) REFERENCES users(id);


--
-- TOC entry 2695 (class 2606 OID 49189)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2698 (class 2606 OID 49196)
-- Name: accounts owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT owner FOREIGN KEY (owner) REFERENCES users(id);


-- Completed on 2019-04-20 15:40:57

--
-- PostgreSQL database dump complete
--

