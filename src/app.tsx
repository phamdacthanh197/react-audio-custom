import React, { useCallback } from "react";
import ReactDOM from "react-dom/client";
import AudioRecorder from "./components/AudioRecordingComponent";
import useAudioRecorder from "./hooks/useAudioRecorder";

const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
};

const App = () => {
    const recorderControls = useAudioRecorder()
    const handleGenFile = () => {
        recorderControls.stopRecording()
        recorderControls.startGenfile()
    }

    return (
        <>
            <button onClick={recorderControls.startRecording}>gen</button>
            <button onClick={handleGenFile}>stop</button>

            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                onGenfileComplete={(file) => {
                    console.log(file, "file");
                    recorderControls.clearGenfile()
                }}
                // audioTrackConstraints={{ 
                //   noiseSuppression: true,
                //   echoCancellation: true,
                // }} 
                recorderControls={recorderControls}
                onNotAllowedOrFound={(err) => console.table(err)}
                showVisualizer={true}
                downloadOnSavePress={false}
                downloadFileExtension="mp3"
            />
        </>
    )
}

export default App