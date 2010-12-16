class String
  def url_safe
    self.gsub(/\s+/, '-').downcase
  end
end

namespace :categories do
  desc 'create individual category pages'
  task :create_pages do
    puts "Generating category pages..."
    require 'rubygems'
    require 'jekyll'
    include Jekyll::Filters

    options = Jekyll.configuration({})
    site = Jekyll::Site.new(options)

    site.categories.sort.each do |category, posts|
      html = ''
      html << <<-HTML
---
layout: default
title: "postings categorized under #{category}"
section: blog
current_category: #{category}
---
      HTML
      html << '<div id="posts">'
        html << "{% for post in site.posts %}"
        html << "{% assign content = post.content %}"
        html << "{% include post.html %}"
        html << "{% endfor %}"
      html << '</div>'

      File.open("categories/#{category.url_safe}.html", 'w+') do |file|
        file.puts html
      end
    end
    puts 'Done.'
  end
end
