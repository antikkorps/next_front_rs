"use client";

import { use, useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "../modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/auth/LoginForm";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import SignupForm from "@/components/auth/SignupForm";
import { pick } from "lodash";
import { useParams } from "next/navigation";
import { transformLocaleFromArray } from "@/lib/transform-locale-from-array";


interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onConfirm: () => void;
    // loading: boolean;
    // title: string;
    // description: string;
}

export const AuthModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    // onConfirm,
    // loading,
    // title,
    // description
}) => {
    const [isMounted, setIsMounted] = useState(false);

    const messages = useMessages();
    const tLogin = useTranslations('Login');
    const tRegister = useTranslations('Register');
    const {locale: localeValue} = useParams();
    const locale = transformLocaleFromArray(localeValue);

    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(prevOpen => prevOpen !== isOpen ? isOpen : prevOpen);
    }, [isOpen]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
        <Modal
            // title={title}
            // description={description}
            isOpen={open}
            onClose={onClose}
        >
            {/* <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, ["Button", "Register", "Login", "Input"])}> */}
            <div className="w-[90%] mx-auto">
           
                <Tabs defaultValue="login">
                    <TabsList className="grid grid-cols-2 mt-1">
                        <TabsTrigger value="login">{tLogin("title")}</TabsTrigger>
                        <TabsTrigger value="register">{tRegister("title")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm
                        inModal={true}
                        setFormConfirm={setOpen}
                        formConfirm={open}
                        />
                    </TabsContent>
                    <TabsContent value="register">
                        <SignupForm 
                        inModal={true}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            {/* </NextIntlClientProvider> */}
        </Modal>
    );
};