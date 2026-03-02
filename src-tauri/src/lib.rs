// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};
use std::thread;
use std::time::Duration;

#[tauri::command]
async fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn echo_compute(input: String) -> String {
    // Simulate "Thinking" time for the UI waveform
    thread::sleep(Duration::from_millis(1200));
    format!("ECHO Core processed: {}", input)
}

#[tauri::command]
async fn get_echo_status() -> String {
    "OPERATIONAL".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::AppearanceBased, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, echo_compute, get_echo_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
