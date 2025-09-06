import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { getStatusMessage } from "../../store/gameStatusSlice";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import {
    DRAW_MESSAGE,
    GAME_IN_PROGRESS,
    PLAYER_O_WINS,
    PLAYER_X_WINS,
    PLAYERS,
} from "../../constants";

type Props = {
    onResetMessage: () => void;
    onResetGame: () => void;
    makeCurrentPlayer: (user: string) => void;
};
const CommonDialog: React.FC<Props> = ({
    onResetMessage,
    onResetGame,
    makeCurrentPlayer,
}) => {
    const message = useSelector(getStatusMessage);

    const toast = useRef<Toast>(null);

    const drawAccept = () => {
        onResetMessage();
    };

    const resume = () => {
        toast.current?.show({
            severity: "info",
            summary: "Resume",
            detail: "Game resumed successfully!",
            life: 3000,
        });
        onResetMessage();
    };

    const reset = () => {
        toast.current?.show({
            severity: "warn",
            summary: "Reset",
            detail: "Game reset successfully",
            life: 3000,
        });
        onResetGame();
    };
    console.log(message);
    useEffect(() => {
        if (message && message !== GAME_IN_PROGRESS) {
            if (message === DRAW_MESSAGE) {
                confirmDialog({
                    group: "headless",
                    message: message,
                    header: "Success",
                    icon: "pi pi-thumbs-up",
                    defaultFocus: "accept",
                });
            } else if (message) {
                if (message === PLAYER_X_WINS) {
                    makeCurrentPlayer(PLAYERS.X);
                } else if (message === PLAYER_O_WINS) {
                    makeCurrentPlayer(PLAYERS.O);
                }

                confirmDialog({
                    group: "headless",
                    message: `${message}<br />Do you want to Resume or Reset the Game ?`,
                    header: "Confirmation",
                    icon: "pi pi-exclamation-triangle",
                    defaultFocus: "accept",
                });
            }
        }
    }, [message]);

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                className="z-5 bg-white	"
                content={({
                    headerRef,
                    contentRef,
                    footerRef,
                    hide,
                    message,
                    ...rest
                }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span
                            className="font-bold text-2xl block mb-2 mt-4"
                            ref={headerRef}
                        >
                            {message.header}
                        </span>
                        <p
                            className="mb-0 flex flex-column align-items-center justify-content-center"
                            ref={contentRef as any}
                        >
                            {message.message.split("<br />").map((msg) => (
                                <span>{msg}</span>
                            ))}
                        </p>
                        <div
                            className="flex align-items-center gap-2 mt-4"
                            ref={footerRef as any}
                        >
                            {message.message !== DRAW_MESSAGE ? (
                                <div className="flex gap-4">
                                    <Button
                                        label="Reset"
                                        outlined
                                        onClick={(event) => {
                                            hide(event);
                                            reset();
                                        }}
                                        className="w-8rem"
                                    />
                                    <Button
                                        label="Resume"
                                        onClick={(event) => {
                                            hide(event);
                                            resume();
                                        }}
                                        className="w-8rem"
                                    />
                                </div>
                            ) : (
                                <Button
                                    label="Ok"
                                    onClick={(event) => {
                                        hide(event);
                                        drawAccept();
                                    }}
                                    className="w-8rem"
                                />
                            )}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default CommonDialog;
