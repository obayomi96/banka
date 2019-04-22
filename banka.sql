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

CREATE TABLE accounts (
    id character varying(250) NOT NULL,
    accountnumber character varying(250) NOT NULL,
    createdon date NOT NULL,
    owner character varying(250) NOT NULL,
    type character varying(250) NOT NULL,
    status character varying(250) NOT NULL,
    balance real NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 49201)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE transactions (
    id character varying(250) NOT NULL,
    createdon date NOT NULL,
    type character varying(250) NOT NULL,
    accountnumber character varying(250) NOT NULL,
    cashier integer NOT NULL,
    amount real NOT NULL,
    oldbalance real NOT NULL,
    newbalance real NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 49182)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id character varying(250) NOT NULL,
    firstname character varying(250) NOT NULL,
    lastname character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    type character varying(250) NOT NULL,
    isadmin boolean NOT NULL
);

--
-- TOC entry 2697 (class 2606 OID 49208)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


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

