'use client';

import { useMarkerContext } from '@/context/markerContext';
import { createClient } from '@/utils/supabase/client';
import { useActionContext } from '@/context/actionContext';
import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { fetchLocation } from '../../utils/react-leaflet/fetchLocation';

export default function Posts() {
  const supabase = createClient();
  const { toggleButtonState } = useActionContext();

  const { markerState } = useMarkerContext();
  const [complete, SetCompleteSubmit] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const category = formData.getAll('category') as string[];
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;

    const markerLocation = markerState?.getLatLng();

    if (!markerLocation) {
      alert('Please select a location on the map');
      return;
    }

    const lat = markerLocation.lat;
    const lng = markerLocation.lng;

    const nowLocation = await fetchLocation(lat, lng);
    const locationText = `${markerLocation.lat},${markerLocation.lng}`;

    if (nowLocation === '') {
      alert('Please select a location on the map');
      return;
    }

    const { data, error } = await supabase.from('posts').insert([
      {
        name,
        animals: category,
        description,
        location: locationText,
        keywords: nowLocation,
        google_map_url: url,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    if (error) {
      console.error('error', error);
    } else {
      console.log('data', data);
      SetCompleteSubmit(true);
    }
  };

  const closeModal = () => {
    toggleButtonState();
  };

  return (
    <div className="absolute bottom-0 left-0 z-[999] flex w-full flex-col">
      <div className="h-1/2 overflow-scroll p-5 px-5">
        <div className="rounded-xl bg-white p-5">
          <div className="mb-5 flex max-w-full">
            <h1 className="text-center text-2xl font-bold">投稿</h1>
            <button className="ml-auto" onClick={closeModal}>
              <XIcon />
            </button>
          </div>

          {!complete ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  公園 / 建物名
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  一緒に行ける動物
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value="犬"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">犬</span>
                  </label>
                  <label className="ml-4 inline-flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value="猫"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">猫</span>
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  公園 / 建物の説明
                </label>
                <textarea
                  placeholder="Description"
                  id="description"
                  name="description"
                  required
                  className="mt-1 block w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Google Map URL
                </label>
                <input
                  type="url"
                  placeholder="URL"
                  id="url"
                  name="url"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            ''
          )}

          {complete ? <p className="py-5">投稿しました！</p> : ''}
        </div>
      </div>
    </div>
  );
}
