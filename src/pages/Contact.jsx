import React from 'react';
import { LampDemo } from '../components/LampDemo';

const Contact = () => {
    return (
        <div className="flex flex-col items-center mt-10 px-6">
            <h1 className="text-4xl font-semibold mb-6">Contact Us</h1>

            <div className="w-full max-w-lg bg-white rounded shadow-md p-6">
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Your Email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Your Message"
                        ></textarea>
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="copy"
                            className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label htmlFor="copy" className="text-sm text-gray-700">
                            Send me a copy of this message
                        </label>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
