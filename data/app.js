const scriptURL =                       
"https://script.google.com/macros/s/AKfycbxkAOMKmWwjGjZZfh1LNhno6GTlXMtguyhKwyTAGXGbIfxxX8_oc7izHtWssb4A1scwxA/exec";
const form = document.forms["submit-to-google-sheet"];
const fileInput = document.getElementById("media");

form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        var ex = document.getElementById("ex").checked;
        var age = document.getElementById("age").checked;
       
        if (age) {
            formData.append("age", "Yes");
        } else {
            formData.append("age", "No");
        }

        if (ex) {
            formData.append("ex", "Yes");
        } else {
            formData.append("ex", "No");
        }

        // Handle the file upload
        const fileInput = document.getElementById("media");
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            // Size validation here, only less than 2MB allowed
            if (file.size > 1024 * 1024 * 2) {
                swal("Error", "File size should be less than 2MB.", "error");
                return;
            }

            reader.onload = async function () {
                formData.append("media", reader.result.split(",")[1]); // Append base64 data
                await submitForm(formData);
            };

            reader.readAsDataURL(file);
        } else {
            // No file uploaded
            await submitForm(formData);
        }
        });

async function submitForm(formData) {
    // Get the submit button and change its text to "Loading..."
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "Loading...";

    // Submit the form data to the Google Sheet
    fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
            swal("Done", "Submitted Successfully.", "success");
            form.reset();
        })
        .catch((error) => {
            swal("Error", "Something went wrong. Please try again!", "error");
        })
        .finally(() => {
            // Reset the submit button back to "Submit"
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
        });
}
